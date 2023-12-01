-- SELECT
SELECT column_name FROM table_name;

SELECT * FROM Test;

-- SELECT DISTINCT
-- returns unique data
SELECT DISTINCT(column_name) FROM table_name;

SELECT DISTINCT column_name FROM table_name;

-- COUNT
SELECT COUNT(column_name) FROM table_name;

SELECT COUNT(DISTINCT name) FROM table_name;

-- WHERE
SELECT column1, column2 FROM table_name WHERE conditions;

SELECT column1, column2 FROM table_name WHERE surname='name' AND age='4' OR mail='test@test.com' OR rating !=1;

-- ORDER BY
-- by default ASC
SELECT column1, column2 FROM table_name ORDER BY column1 ASC / DESC;

-- LIMIT
SELECT column1, column2 FROM table_name ORDER BY column1 LIMIT 10;

-- BETWEEN
SELECT * FROM table_name WHERE column_name BETWEEN 1 AND 10;

SELECT * FROM table_name WHERE column_name NOT BETWEEN 1 AND 10;

-- this would result upto 15th but not 15th
SELECT * FROM table_name WHERE column_name NOT BETWEEN '2020-12-10' AND '2020-12-15';

-- IN
-- check if value is included
SELECT column_name FROM table_name WHERE column_name IN ('red','blue');

-- LIKE & ILIKE
-- for pattern matching
-- % - for any sequence of characters
-- _ - for any single character
-- LIKE is case-sensitive
-- ILIKE is case-insensitive

SELECT column_name FROM table_name WHERE color LIKE 'r%';

-- Aggregation Methods
-- MIN
-- MAX
-- AVG
-- ROUND(result, 2)
-- SUM

SELECT MAX(column_name) FROM table_name;

SELECT ROUND(AVG(column_name), 2) FROM table_name;

-- GROUP BY
-- colums must either have an aggregate function or be in group by call
SELECT catory_column, AGG(data_col) FROM table_name GROUP BY catory_column;

SELECT column1, column2, SUM(column3) FROM table_name GROUP BY column1, column2;

-- the where should not refer to the aggregation result
SELECT column1, column2, SUM(column3) FROM table_name WHERE column2 IN ('something') GROUP BY column1, column2;

-- to sort result based on aggregation result we need to reference the entire function
SELECT column1, column2, SUM(column3) FROM table_name GROUP BY column1, column2 ORDER BY SUM(column3);