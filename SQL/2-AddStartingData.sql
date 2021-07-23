USE [Capstone-StoreWorks]
GO

SET IDENTITY_INSERT [Employees] ON
	INSERT INTO [Employees]
		(Id, FirebaseUserId, EmployeeName, Email, CanManage)
	VALUES
		(1, 'RkIziCohv3V0ibVrdS8fJ3h075M2', 'Manager', 'manager@storeworks.com', 1),
		(2, 'u1FcR7lEI0gCtGABrXfNrIfZFsR2', 'Employee', 'employee@storeworks.com', 0),
		(3, 'QcTZ04B8LuT5OAeGoxrRWyWwI3n1', 'Marshall Knight', 'mknight52@demo.com', 0),
		(4, 'MjxusHkZbbVloXkKko23zttD22X2', 'Erin Quinn', 'erin.q91@demo.com', 0),
		(5, 'Ehjosb48LKWdDos6oLbxnhpbLlF3', 'Marcus Williams', 'marcuswilliams@demo.com', 0),
		(6, 'Y0vwrLiHHbhCovSvZBhn6GFsIHe2', 'Harry Potter', 'harry731@demo.com', 0),
		(7, 'n61qQArohTShsQDokNHfIE21qcx1', 'Jackson Smith', 'jjsmith78@demo.com', 0),
		(8, 'bRzH5LTvXKYlNK7rKRq3Qh7cB6b2', 'Sandra Perez', 'sandra.perez@demo.com', 0),
		(9, 'TZaG9YYO2If1nOSDIDlWqeIDKbE2', 'Nicholas King', 'nicholas89k@demo.com', 0),
		(10, 'bCAQi1pUNHMyRp495n9iONgtjIP2', 'Emma Beard', 'msemma.b@demo.com', 0),
		(11, 'QVxebHfaHHcqRig1Xs7YGgee8BP2', 'Leo Miller', 'leo-miller1998@demo.com', 0),
		(12, 'HgHNvkxdHmW8KqOTCD8Vl08R3en2', 'James Bond', 'jamesb007@demo.com', 0)
SET IDENTITY_INSERT [Employees] OFF


SET IDENTITY_INSERT [Categories] ON
	INSERT INTO [Categories]
		(Id, CategoryName)
	VALUES
		(1, 'Health & Beauty'),
		(2, 'Lawn & Garden'),
		(3, 'Pets'),
		(4, 'Toys'),
		(5, 'Automotive'),
		(6, 'Sporting Goods'),
		(7, 'Hardware'),
		(8, 'Electronics'),
		(9, 'Infants'),
		(10, 'Appliances'),
		(11, 'Furniture'),
		(12, 'Apparel'),
		(13, 'Groceries'),
		(14, 'Cleaning'),
		(15, 'Home Goods')
SET IDENTITY_INSERT [Categories] OFF


SET IDENTITY_INSERT [Products] ON
	INSERT INTO [Products]
		(Id, CategoryId, ProductName, Quantity, Cost, SellPrice)
	VALUES
		(1, 12, 'Mens White Polo', 10, 19.89, 22.98),
		(2, 1, 'Toothpaste Twin Pack', 16, 4.26, 6.50),
		(3, 3, '20lb Dry Dog Food', 4, 13.44, 15.98),
		(4, 10, 'Toaster Oven', 7, 212.66, 235.00),
		(5, 8, 'Gaming Console', 2, 485.13, 499.99),
		(6, 5, '5qt Synthetic Engine Oil', 11, 22.79, 28.75),
		(7, 6, '135-Pack Skeet Clay Targets', 5, 10.41, 13.98),
		(8, 15, '10-Pack Plastic Clothes Hangers', 30, 2.88, 3.90),
		(9, 2, 'Stainless Steel Gas Grill', 1, 1095.36, 1299.00),
		(10, 4, '12V Battery Powered Kids Truck', 2, 371.87, 400.00),
		(11, 12, 'Womens Gray V-Neck Tee', 9, 13.10, 15.99)
SET IDENTITY_INSERT [Products] OFF


SET IDENTITY_INSERT [Sales] ON
	INSERT INTO [Sales]
		(Id, ProductId, EmployeeId, SaleQuantity, SaleDate, SaleTotal)
	VALUES
		(1, 5, 3, 1, '2021-07-20 13:43:21.000', 499.99),
		(2, 1, 11, 4, '2021-07-21 09:32:55.000', 91.92),
		(3, 8, 10, 2, '2021-07-21 09:45:19.000', 7.80)
SET IDENTITY_INSERT [Sales] OFF


SET IDENTITY_INSERT [Received] ON
	INSERT INTO [Received]
		(Id, ProductId, EmployeeId, ReceivedQuantity, ReceivedDate, ReceivedTotal)
	VALUES
		(1, 2, 5, 5, '2021-07-20 08:12:20.000', 21.30),
		(2, 4, 7, 2, '2021-07-20 08:13:16.000', 425.32)
SET IDENTITY_INSERT [Received] OFF


SET IDENTITY_INSERT [Shrinkage] ON
	INSERT INTO [Shrinkage]
		(Id, ProductId, EmployeeId, ShrinkQuantity, ShrinkDate, ShrinkTotal)
	VALUES
		(1, 6, 3, 1, '2021-07-21 10:23:39.000', 22.79),
		(2, 2, 4, 2, '2021-07-21 10:30:03.000', 8.52)
SET IDENTITY_INSERT [Shrinkage] OFF