const url='http://127.0.0.1:8000/api/'

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