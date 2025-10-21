"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boards = void 0;
exports.boards = [
    // 🧑‍💻 ENGINEERING
    {
        id: 'board-eng-platform',
        title: 'Platform Development',
        columnIds: [
            'col-eng-plat-backlog',
            'col-eng-plat-progress',
            'col-eng-plat-review',
            'col-eng-plat-done',
        ],
        owner: 'b4c5bd0a-d3d7-4af5-a34c-dc7f75364511',
        sharedWith: [],
    },
    {
        id: 'board-eng-frontend',
        title: 'Frontend Overhaul',
        columnIds: [
            'col-eng-front-todo',
            'col-eng-front-progress',
            'col-eng-front-done',
        ],
        owner: 'b4c5bd0a-d3d7-4af5-a34c-dc7f75364511',
        sharedWith: [],
    },
    {
        id: 'board-eng-bugs',
        title: 'Bug Triage',
        columnIds: [
            'col-eng-bugs-reported',
            'col-eng-bugs-fixing',
            'col-eng-bugs-verified',
        ],
        owner: 'b4c5bd0a-d3d7-4af5-a34c-dc7f75364511',
        sharedWith: [],
    },
    // 📊 DATA SCIENCE
    {
        id: 'board-data-analytics',
        title: 'Customer Analytics',
        columnIds: [
            'col-data-analytics-todo',
            'col-data-analytics-progress',
            'col-data-analytics-done',
        ],
        owner: 'ff8c1829-fdf3-4955-a1f5-03df05820a9d',
        sharedWith: [],
    },
    {
        id: 'board-data-model',
        title: 'Model Development',
        columnIds: ['col-ml-todo', 'col-ml-progress', 'col-ml-validate'],
        owner: 'ff8c1829-fdf3-4955-a1f5-03df05820a9d',
        sharedWith: [],
    },
    // 📅 PROJECT MANAGEMENT
    {
        id: 'board-pm-launch',
        title: 'Q4 Launch Planning',
        columnIds: ['col-pm-launch-plan', 'col-pm-launch-exec'],
        owner: 'ff8c1829-fdf3-4955-a1f5-03df05820a9d',
        sharedWith: ['b4c5bd0a-d3d7-4af5-a34c-dc7f75364511'],
    },
    // 🎨 DESIGN
    {
        id: 'board-design-web',
        title: 'Website Redesign',
        columnIds: [
            'col-design-web-todo',
            'col-design-web-progress',
            'col-design-web-done',
        ],
        owner: 'b4c5bd0a-d3d7-4af5-a34c-dc7f75364511',
        sharedWith: ['ff8c1829-fdf3-4955-a1f5-03df05820a9d'],
    },
];
//# sourceMappingURL=boards.js.map