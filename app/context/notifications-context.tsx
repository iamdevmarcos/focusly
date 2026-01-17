import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";

interface NotificationsContextProps {
  requestPermission: () => void;
  sendNotification: (title: string, body: string) => void;
  showNotificationPrompt: () => void;
}

const NotificationsContext = createContext<
  NotificationsContextProps | undefined
>(undefined);

export const NotificationsProvider = ({ children }: PropsWithChildren) => {

  const requestPermission = useCallback(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted!");
        } else {
          console.log("Notification permission denied!");
        }
      });
    }
  }, []);

  const sendNotification = useCallback((title: string, body: string) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body,
          icon: "/images/logo.png",
          badge: "/images/logo.png",
        });
      });
    } else {
      console.log("Notification permission denied!");
    }
  }, []);

  const showNotificationPrompt = () => {
    const hasSeenPrompt = localStorage.getItem("hasSeenNotificationPrompt");
    if (!hasSeenPrompt) {
      window.alert("Allow notifications to be informed when your focus session ends!");
    }

    requestPermission();
    localStorage.setItem("hasSeenNotificationPrompt", "true");
  };

  return (
    <NotificationsContext.Provider
      value={{ requestPermission, sendNotification, showNotificationPrompt }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotification must be use within NotificationProvider");
  }
  return context;
};
