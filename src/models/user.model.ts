export class User {
    firstName: string;
    lastName: string;
    img: string;
    email: string;

    constructor(firstName: string, lastName: string, img: string, email: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.img = img
        this.email = email
    }
}