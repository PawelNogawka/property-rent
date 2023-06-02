import EmptyList from "./components/uiElements/EmptyList";

export default async function Custom404() {
  return (
    <EmptyList
      title="Error 404 - this page does not exist"
      subtitle="Return to the previous page"
    />
  );
}
