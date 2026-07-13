public class Pessoa{
    public int Id{
        get;
        set;
    }

    public required string Nome{
        get;
        set;
    }

    public int Idade{
        get;
        set;
    }

    public List<Transacao> Transacoes{
        get;
        set;
    } =
    new();
}

