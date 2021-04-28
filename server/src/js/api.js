const createUser = async (email, password, name, id) => {
    const API = "/createUser";
    const data = { email, password, name, id };
    const options = { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(data) };
    const response = await fetch(API, options);
    return await response.json();
};

const getUserData = async uid => {
    const API = `/getUserData/${uid}`;
    const response = await fetch(API);
    return await response.json();
};
