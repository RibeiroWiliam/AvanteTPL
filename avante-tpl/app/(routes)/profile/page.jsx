import CheckboxButton from "@/app/components/CheckboxButton";

export default function Profile() {
  return (
    <main>
      Editar Perfil
      <form action="/profile">
        <label>Nome</label>
        <input type="text" />
        <label>Sobrenome</label>
        <input type="text" />

        <button>Alterar Senha</button>
        <h2>Disponibilidades</h2>

        <label className="block">Segunda</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Terça</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Quarta</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Quinta</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Sexta</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Sábado</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <label className="block">Domingo</label>
        <CheckboxButton text="06:00 - 08:00"/>
        <CheckboxButton text="08:00 - 10:00"/>
        <CheckboxButton text="10:00 - 12:00"/>
        <CheckboxButton text="14:00 - 16:00"/>
        <CheckboxButton text="16:00 - 18:00"/>
        <CheckboxButton text="18:00 - 20:00"/>

        <button className="block">Salvar</button>
      </form>
    </main>
  );
}
