const url='http://127.0.0.1:3210/api/'

function Organization(name, id_organization, budget, date_foundation, addres, inn){
    this.name = name;
    this.id_organization = id_organization;
    this.budget = budget;
    this.date_foundation = date_foundation;
    this.addres = addres;
    this.inn = inn;
}

function Strategy(name, id_strategy, description, date_start, date_end, done){
    this.name = name;
    this.id_strategy = id_strategy;
    this.description = description;
    this.date_start = date_start;
    this.date_end = date_end;
    this.done = done;
}

function BarData(year,January, February, March, April, May, June, July, August, September, October, November, December)
{
    this.year=year;
    this.January=January;
    this.February=February;
    this.March=March;
    this.April=April;
    this.May=May;
    this.June=June;
    this.July=July;
    this.August=August;
    this.September=September;
    this.October=October;
    this.November=November;
    this.December=December;
}

function Department(id_department, name, description, organization_id){
    this.name = name;
    this.id_department = id_department;
    this.description = description;
    this.organization_id = organization_id;
}

function Finance(id_operations, summ, date_operation, description, organization_id){
    this.id_operations = id_operations;
    this.summ = summ;
    this.date_operation = date_operation;
    this.description = description;
    this.organization_id = organization_id;
}

function Employee(id_employee, surname, name, secondname, date_birth, seriapasp, numberpasp, email, department_id){
    this.id_employee = id_employee;
    this.surname = surname;
    this.name = name;
    this.secondname = secondname;
    this.date_birth = date_birth;
    this.seriapasp = seriapasp;
    this.numberpasp = numberpasp;
    this.email = email;
    this.department_id = department_id;
}

function Task(id_task, description, name, date_End, date_Start, done, employee_id){
    this.id_task = id_task;
    this.description = description;
    this.name = name;
    this.date_End = date_End;
    this.date_Start = date_Start;
    this.done = done;
    this.employee_id = employee_id;
}

function Goal(id_goal, description, name, date_End, date_Start, done, department_id){
    this.id_goal = id_goal;
    this.description = description;
    this.name = name;
    this.date_End = date_End;
    this.date_Start = date_Start;
    this.done = done;
    this.department_id = department_id;
}

function Post(id_post, name, salary, department_id){
    this.name = name;
    this.id_post = id_post;
    this.salary = salary;
    this.department_id = department_id;
}

function Employee_Post(id_employee_post, post_id, employee_id, department_id){
    this.id_employee_post = id_employee_post;
    this.post_id = post_id;
    this.employee_id = employee_id;
}