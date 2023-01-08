
type UserProps = {
  email: string;
  monthlySalary: number;
  username: string;
  currency: string;
  phone: string;
  savingsTarget: number;
};

type OutgoingRecord = {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    item:      string;
    currency:  string;
    userId:    number;
    tag:       string;
    cost:      number;
};


export type {
  UserProps,
  OutgoingRecord
}
