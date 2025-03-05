export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="bg-green-500 px-4 py-3 text-white">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-white bg-red-500 px-4 py-3">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4 py-3">{message.message}</div>
      )}
    </div>
  );
}
