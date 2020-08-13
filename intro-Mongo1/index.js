db.users.insert({
  name: "Ali",
  age: 25,
  address: "Berlin",
  hobbies: ["dance", "sleep"],
  emails: {
    private: "me@mail.com",
    work: "you@mail.com",
  },
  data: Date(),
});
// new
db.users.insert({
  name: "Nancy",
  age: 34,
  address: "Paris",
  data: Date(),
});
// many
db.users.insertMany([
  {
    name: "Ludovic",
    age: 30,
    address: "Paris",
    data: Date(),
  },
  {
    name: "Sonia",
    age: 24,
    address: "Florence",
    data: Date(),
  },
  {
    name: "Nancy",
    age: 12,
    address: "Pompei",
    data: Date(),
  },
]);
