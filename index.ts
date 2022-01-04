import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
    return knex.schema.table('Notifications', (table) => {
        // Cоздаем колонку Date в таблице Notifications
        // Create Date column in Notifications table.
        table.specificType('Date', 'date').defaultTo('');
    }).then(() => {
        // Выполняем SELECT запрос для получения ID события и даты
        // Run SELECT query to get Event ID and Date.
        return knex.raw(`
			SELECT ID, Date from Events;
		`);
    }).then((data) => {
        // Переменная data - массив следующих объектов:
        // data variable is the array of rows:
        // {
        //     ID: 1,
        //     Date: '05-22-2021',
        // },

        // Собираем новую строку запроса для обновления данных в таблице Notifications.
        // Create query string and gather all the necessary values to update Notifications table.
        let query: string = '';
        data.rows.forEach((row: Record<string, []>) => {
            query += `UPDATE Notifications(Date)
			VALUES('${row.date}')
            WHERE EventID='${row.id}';`;
        });

        // Выполняем запрос
        // Run the query.
        return knex.raw(query);
    });
}

export function down(knex: Knex): Promise<void> {
    return knex.schema.table('Notifications', (table) => {
        table.dropColumn('Date');
    });
}
