function TestComponent(props) {
  function testConnection() {
    fetch("/test", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  return <div onClick={testConnection}>Test connection</div>;
}
export default TestComponent;
