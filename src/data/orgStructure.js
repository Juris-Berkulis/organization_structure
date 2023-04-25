const fs = require("fs");

const orgStructure = [
    {
        name: "Руководство",
        children: [
            {
                name: "Отдел 1",
                children: [
                    {
                        name: "Отдел 2",
                    },
                    {
                        name: "Отдел 3",
                    },
                    {
                        name: "Отдел 4",
                    },
                ],
            },
            {
                name: "Отдел 5",
                children: [
                    {
                        name: "Отдел 6",
                    },
                ],
            },
            {
                name: "Отдел 7",
            },
        ],
    },
];

fs.writeFileSync("./src/data/orgStructure.json", JSON.stringify(orgStructure, null, 4));
//* - Команда для копирования данных в json-файл: "node ./src/data/orgStructure.js" (после выполнения команды и деплоя необходимо сбросить значение в LocalStorage браузера).
