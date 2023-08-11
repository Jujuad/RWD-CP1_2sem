document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form"); // pega o formulário
    const tasksDiv = document.getElementById("task-list"); // pega as tarefas que serão exibidas
    const listByImportanceButton = document.getElementById("list-by-importance"); // botão "Listar por Importância"
    const tasks = []; 
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // interrompe o padrao do form

        // pega os valores dos campos de entrada do formulário
        const descricao = document.getElementById("descricao").value;
        const autor = document.getElementById("autor").value;
        const departamento = document.getElementById("departamento").value;
        const importancia = parseInt(document.getElementById("importancia").value);
        const valor = document.getElementById("valor").value;
        const duracao = document.getElementById("duracao").value;

        // criar obj
        const novaTarefa = {
            descricao,
            autor,
            departamento,
            importancia,
            valor: valor || null, // define como null caso nao tiver valor
            duracao: duracao || null // define como null caso nao tiver valor
        };

        // add a nova tarefa no array de tarefas
        tasks.push(novaTarefa);

        // chama a função para exibir a lista de tarefas atualizadas
        exibirTarefas();

        // limpa os campos do formulário
        taskForm.reset();
    });

    listByImportanceButton.addEventListener("click", function () {
        // ordena por importancia
        const tarefasOrdenadas = tasks.slice().sort((a, b) => b.importancia - a.importancia);
        const descricaoTarefasOrdenadas = tarefasOrdenadas.map(tarefa => tarefa.descricao);
        alert("Lista de Tarefas por Importância:\n" + descricaoTarefasOrdenadas.join("\n"));
    });

    function exibirTarefas() {
        // limpa o conteúdo anterior da div de exibição das tarefas
        tasksDiv.innerHTML = "";

        // passa pelo array de tarefas e add cada tarefa no html
        tasks.forEach(function (tarefa, index) {
            const tarefaDiv = document.createElement("div"); // cria div para tarefa
            tarefaDiv.className = "tarefa"; // add class 

            // cria um span para mostrar a descricao da tarefa
            const descricaoSpan = document.createElement("span");
            descricaoSpan.innerText = tarefa.descricao;

            // cria botao de excluir
            const excluirButton = document.createElement("button");
            excluirButton.innerText = "Excluir";
            excluirButton.className = "excluir"; // add class
            excluirButton.addEventListener("click", function () {
                // exclui ao clicar no botao
                tasks.splice(index, 1);
                // exibir as tarefas atualizadas
                exibirTarefas();
            });

            // add os elementos criados a div da tarefa
            tarefaDiv.appendChild(descricaoSpan);
            tarefaDiv.appendChild(excluirButton);

            // add a div da tarefa a div de exibir das tarefas
            tasksDiv.appendChild(tarefaDiv);
        });

        // pega as tarefas exibidas e adiciona um clique
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

    // exibir as tarefas inicialmente
    exibirTarefas();
});
