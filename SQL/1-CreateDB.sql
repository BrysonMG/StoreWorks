USE [master]

IF db_id('Capstone-StoreWorks') IS NULL
	CREATE DATABASE [Capstone-StoreWorks]
GO

USE [Capstone-StoreWorks]
GO

DROP TABLE IF EXISTS [Employees];
DROP TABLE IF EXISTS [Products];
DROP TABLE IF EXISTS [Categories];
DROP TABLE IF EXISTS [Sales];
DROP TABLE IF EXISTS [Received];
DROP TABLE IF EXISTS [Shrinkage];
GO

CREATE TABLE [Employees] (
	[Id] integer PRIMARY KEY IDENTITY,
	[FirebaseUserId] varchar(50) NOT NULL,
	[EmployeeName] varchar(50) NOT NULL,
	[Email] varchar(50) NOT NULL,
	[CanManage] bit NOT NULL,

	CONSTRAINT [UQ_FirebaseUserId] UNIQUE (FirebaseUserId),
	CONSTRAINT [UQ_Email] UNIQUE (Email)
)

CREATE TABLE [Categories] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CategoryName] varchar(50) NOT NULL
)

CREATE TABLE [Products] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CategoryId] integer NOT NULL,
	[ProductName] varchar(100) NOT NULL,
	[Quantity] integer NOT NULL,
	[Cost] decimal(18,2) NOT NULL,
	[SellPrice] decimal(18, 2) NOT NULL,

	CONSTRAINT [FK_Product_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]),
	CONSTRAINT [UQ_ProductName] UNIQUE (ProductName)
)

CREATE TABLE [Sales] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProductId] integer NOT NULL,
	[EmployeeId] integer NOT NULL,
	[SaleQuantity] integer NOT NULL,
	[SaleDate] datetime NOT NULL,
	[SaleTotal] decimal(18,2) NOT NULL,

	CONSTRAINT [FK_Sale_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]),
	CONSTRAINT [FK_Sale_Employee] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id])
)

CREATE TABLE [Received] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProductId] integer NOT NULL,
	[EmployeeId] integer NOT NULL,
	[ReceivedQuantity] integer NOT NULL,
	[ReceivedDate] datetime NOT NULL,
	[ReceivedTotal] decimal(18,2) NOT NULL,

	CONSTRAINT [FK_Received_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]),
	CONSTRAINT [FK_Received_Employee] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id])
)

CREATE TABLE [Shrinkage] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProductId] integer NOT NULL,
	[EmployeeId] integer NOT NULL,
	[ShrinkQuantity] integer NOT NULL,
	[ShrinkDate] datetime NOT NULL,
	[ShrinkTotal] decimal(18,2) NOT NULL,

	CONSTRAINT [FK_Shrink_Product] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]),
	CONSTRAINT [FK_Shrink_Employee] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id])
)

GO