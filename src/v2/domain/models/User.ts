class User {
  name: string;
  email: string;
  password: string;
  agreeWithPolicies: boolean;

  constructor(name: string, email: string, password: string, agreeWithPolicies: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.agreeWithPolicies = agreeWithPolicies
  }
}

export { User };
