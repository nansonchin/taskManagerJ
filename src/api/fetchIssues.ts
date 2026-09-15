async function fetchIssues() {
  try {
    const url = "https://dummyjson.comm/todos";
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error("Failed to fetch todos");
    }

    return result.json();
  } catch (error) {
    console.error("Failed to fetchIssues", error)
  }
}
