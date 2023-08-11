document.addEventListener("DOMContentLoaded", function () {

    const taskForm = document.getElementById("task-form"); // pega o formulário
    const tasksDiv = document.getElementById("task-list"); // pega a div de exibicao das tarefas
    const tasks = []; // array que vai armazenar as tarefas

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // filtra o padrao do formulário

        // pegas os atributos/valores dos campos de entrada do formulário
        const descricao = document.getElementById("descricao").value;
        const autor = document.getElementById("autor").value;
        const departamento = document.getElementById("departamento").value;
        const importancia = parseInt(document.getElementById("importancia").value);

        // cria um novo obj para tarefa
        const novaTarefa = {
            descricao,
            autor,
            departamento,
            importancia,
            valor: null,
            duracao: null
        };
    });
});
