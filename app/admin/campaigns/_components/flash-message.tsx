type SearchParamValue = string | string[] | undefined;

function toMessage(value: SearchParamValue): string | null {
  if (!value) {
    return null;
  }

  const text = Array.isArray(value) ? value[0] : value;

  if (!text) {
    return null;
  }

  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

type FlashMessageProps = {
  success?: SearchParamValue;
  error?: SearchParamValue;
};

export default function FlashMessage({ success, error }: FlashMessageProps) {
  const successMessage = toMessage(success);
  const errorMessage = toMessage(error);

  if (!successMessage && !errorMessage) {
    return null;
  }

  return (
    <div className="space-y-3">
      {successMessage ? (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
          {successMessage}
        </p>
      ) : null}
      {errorMessage ? (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
