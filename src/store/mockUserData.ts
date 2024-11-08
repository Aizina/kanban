import { User } from "./interfaces";

  export const mockUserData: User = {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    year: new Date().getFullYear(),
  };
  
  export const fetchUserData = (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserData);
      }, 1000); 
    });
  };
  