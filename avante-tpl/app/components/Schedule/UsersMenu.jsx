import { Modal } from "@/app/components/Modal";
import { extractPublishers } from "@/app/utils/extractPublishers";
import { filterActualAssignments } from "@/app/utils/filterActualAssignments";
import PublisherLi from "@/app/components/Schedule/PublisherLi";
import SearchBar from "../Shared/SearchBar";
import { useState } from "react";

export default function UsersMenu({ publishers, assignments, closeMenu }) {
  const [search, setSearch] = useState("")

  const filteredPublishers = extractPublishers(
    filterActualAssignments(assignments),
    publishers
  ).filter(publisher =>
    publisher.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal.Root>
      <Modal.Toggler closeMenu={closeMenu} />
      <Modal.Title>Participações</Modal.Title>
      <SearchBar setSearch={setSearch} color="bg-gray-100"/>
      <div className="max-h-96 overflow-y-scroll py-2">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 px-8">
          {filteredPublishers.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // converte o nome para maiúsculas
                const nameB = b.name.toUpperCase(); // converte o nome para maiúsculas

                if (nameA < nameB) {
                  return -1; // Retorna um número negativo se a vem antes de b
                }
                if (nameA > nameB) {
                  return 1; // Retorna um número positivo se a vem depois de b
                }
                return 0; // Retorna 0 se os nomes forem iguais
              })
              .map((publisher) => <PublisherLi key={publisher.id} publisher={publisher} />)}
        </ul>
      </div>
    </Modal.Root>
  );
}
