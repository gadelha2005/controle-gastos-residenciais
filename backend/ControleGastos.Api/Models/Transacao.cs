public enum TipoTransacao { 
    Despesa, 
    Receita 
}

public class Transacao {
    public int Id { 
        get; 
        set; 
    }

    public required string Descricao { 
        get; 
        set; 
    }

    public decimal Valor { 
        get; 
        set; 
    }


    public TipoTransacao Tipo { 
        get; 
        set; 
    }

    public int PessoaId { 
        get; 
        set; 
    }
    
    public Pessoa? Pessoa { 
        get; 
        set; 
    }
}