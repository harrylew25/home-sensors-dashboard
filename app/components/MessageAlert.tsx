import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Unplug } from "lucide-react";

const offlineMessage =
  "You are currently offline. Some features may not be available. Please check your internet connection.";

const MessageAlert = ({
  title = "Heads up!",
  message = offlineMessage,
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <Alert className="bg-red-600 text-slate-950 text-xl mb-4">
      <AlertTitle className="flex items-center gap-2">
        <Unplug />
        {title}
      </AlertTitle>
      <AlertDescription className="text-slate-950 text-lg">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default MessageAlert;
