using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

UserController userControl = new UserController();

//app.MapGet("/", () => new User("User01","user1@gmail.com","dfsjifhadsjncsjk"));

app.MapPost("/new-user", (User user) => userControl.Create(user));
app.MapPost("/one-user", (User user) => userControl.ReadOne(user));

app.MapPost("/test-db",()=>{
    MsSQLConnection msql = new MsSQLConnection();
    return msql.Test();
});

app.Run();