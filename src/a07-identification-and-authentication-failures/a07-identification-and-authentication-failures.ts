

// TODO Fix the use of hard-coded passwords, see https://cwe.mitre.org/data/definitions/259.html
const username = "admin";
const password = "MyAmazingPassword";
export function setupDBConnection() {
    const connectionString = `mongodb://${username}:${password}@localhost:27017/mydb`;
    console.log(`Connecting to ${connectionString}`)
}
