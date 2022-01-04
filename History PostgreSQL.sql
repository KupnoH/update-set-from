--- Create tables.
CREATE TABLE Events (
		    ID int NOT NULL,
		    Name varchar(255) NOT NULL,
		    Date date,
		    PRIMARY KEY (ID)
		);
		CREATE TABLE Notifications (
		    ID int NOT NULL,
		    EventID int,
		    Text text,
		    PRIMARY KEY (ID),
		    FOREIGN KEY (EventID) REFERENCES Events(ID)
		);

--- Insert dummy values.
INSERT INTO Events
		VALUES (1, 'Test', '05-22-2021'),
			   (2, 'Test1', '05-23-2021'),
		       (3, 'Test2', '05-24-2021'),
		       (4, 'Test3', '05-25-2021'),
		       (5, 'Test4', '05-26-2021');
       	INSERT INTO Notifications
       	VALUES (1, 1, 'test text'),
       		   (2, 2, 'test text'),
       		   (3, 1, 'test text'), 
       		   (4, 2, 'test text'), 
       		   (5, 3, 'test text'), 
       		   (6, 4, 'test text'), 
       		   (7, 5, 'test text');
