document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form"); // Obtém o formulário
    const tasksDiv = document.getElementById("task-list"); // Obtém a <div> onde as tarefas serão exibidas
    const listByImportanceButton = document.getElementById("list-by-importance"); // Botão "Listar por Importância"
    const tasks = []; // Array para armazenar as tarefas

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // Obtém os valores dos campos de entrada do formulário
        const descricao = document.getElementById("descricao").value;
        const autor = document.getElementById("autor").value;
        const departamento = document.getElementById("departamento").value;
        const importancia = parseInt(document.getElementById("importancia").value);
        const valor = document.getElementById("valor").value;
        const duracao = document.getElementById("duracao").value;

        // Cria um novo objeto para representar a tarefa
        const novaTarefa = {
            descricao,
            autor,
            departamento,
            importancia,
            valor: valor || null, // Define o valor ou null se não fornecido
            duracao: duracao || null // Define a duração ou null se não fornecida
        };

        // Adiciona a nova tarefa ao array de tarefas
        tasks.push(novaTarefa);

        // Chama a função para exibir as tarefas atualizadas
        exibirTarefas();

        // Limpa os campos do formulário
        taskForm.reset();
    });

    listByImportanceButton.addEventListener("click", function () {
        // Ordena as tarefas por importância e exibe apenas as descrições
        const tarefasOrdenadas = tasks.slice().sort((a, b) => b.importancia - a.importancia);
        const descricaoTarefasOrdenadas = tarefasOrdenadas.map(tarefa => tarefa.descricao);
        alert("Lista de Tarefas por Importância:\n" + descricaoTarefasOrdenadas.join("\n"));
    });

    function exibirTarefas() {
        // Limpa o conteúdo anterior da div de exibição das tarefas
        tasksDiv.innerHTML = "";

        // Itera sobre o array de tarefas e cria elementos HTML para cada tarefa
        tasks.forEach(function (tarefa, index) {
            const tarefaDiv = document.createElement("div"); // Cria um novo elemento <div> para a tarefa
            tarefaDiv.className = "tarefa"; // Define a classe CSS para estilização

            // Cria um elemento <span> para exibir a descrição da tarefa
            const descricaoSpan = document.createElement("span");
            descricaoSpan.innerText = tarefa.descricao;

            // Cria um botão "Excluir" para remover a tarefa
            const excluirButton = document.createElement("button");
            excluirButton.innerText = "Excluir";
            excluirButton.className = "excluir"; // Define a classe CSS para estilização
            excluirButton.addEventListener("click", function () {
                // Remove a tarefa do array quando o botão "Excluir" é clicado
                tasks.splice(index, 1);
                // Chama a função para exibir as tarefas atualizadas
                exibirTarefas();
            });

            // Adiciona os elementos criados à div da tarefa
            tarefaDiv.appendChild(descricaoSpan);
            tarefaDiv.appendChild(excluirButton);

            // Adiciona a div da tarefa à div de exibição das tarefas
            tasksDiv.appendChild(tarefaDiv);
        });

        // Itera sobre as tarefas exibidas e adiciona um ouvinte de clique
        tasksDiv.querySelectorAll(".tarefa").forEach(function (tarefaDiv, index) {
            tarefaDiv.addEventListener("click", function () {
                exibirDetalhesTarefa(index);
            });
        });
    }

    function exibirDetalhesTarefa(index) {
        const tarefa = tasks[index];
        const detalhes = `
            Descrição: ${tarefa.descricao}
            Autor: ${tarefa.autor}
            Departamento: ${tarefa.departamento}
            Importância: ${tarefa.importancia}
            Valor: ${tarefa.valor || "N/A"}
            Duração: ${tarefa.duracao || "N/A"}
        `;
        alert(detalhes);
    }

    // Chama a função para exibir as tarefas inicialmente
    exibirTarefas();
});
