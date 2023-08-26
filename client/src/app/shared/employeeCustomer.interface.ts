export interface EmployeeCustomer {
    id: string,
    firstName: string,
    lastName: string,
    picture: string,
    email: string
}

export interface EmployeeCustomerDto {
    firstName: string,
    lastName: string,
    picture: File,
    email: string
}