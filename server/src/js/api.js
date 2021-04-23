const createUser = async (email, password, name) => {
    const API = "/createUser";
    const data = { email, password, name };
    const options = { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(data) };
    const response = await fetch(API, options);
    console.log(response);
    return await response.json();
};
