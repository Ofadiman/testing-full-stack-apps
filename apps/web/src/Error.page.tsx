import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Status text: {(error as any).statusText}</p>
      <p>Messag: {(error as any).message}</p>
    </div>
  );
}
