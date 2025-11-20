import { sql } from "drizzle-orm";

export const getAllCoursesWithCategoryIds = sql`
    SELECT
    c.*,
    COALESCE(array_agg(cc."id_category") FILTER (WHERE cc."id_category" IS NOT NULL), '{}') AS "categoryIds"
    FROM courses c
    LEFT JOIN course_categories cc ON c.id = cc."id_course"
    GROUP BY c.id
    `;