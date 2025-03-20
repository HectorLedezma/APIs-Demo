public class User
{
    public string? Name { get; set; }
    public string? Mail { get; set; }
    public string? Pass { get; set; }

    public User(string? name, string? mail, string? pass){
        this.Name = name;
        this.Mail = mail;
        this.Pass = pass;
    }

    public bool Validate(){
        return (this.Name != "" && this.Mail != "" && this.Pass != "");
    }
}