import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
    return knex.schema.table('Notifications', (table) => {
        // Cоздаем колонку Date в таблице Notifications
        // Create Date column in Notifications table.
        table.specificType('Date', 'date').defaultTo('');
    }).then(() => {
        // Выполняем запрос UPDATE-SET-FROM с привязкой к ID события из таблицы Events.
        // Run UPDATE-SET-FROM query with relation to ID from Events table.
        return knex.raw(`
            UPDATE Notifications
            SET Date = Events.date
            FROM Events WHERE Event.ID = Notifications.EventID;
        `);
    });
}

export function down(knex: Knex): Promise<void> {
    return knex.schema.table('Notifications', (table) => {
        table.dropColumn('Date');
    });
}
