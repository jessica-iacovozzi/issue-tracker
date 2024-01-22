-- AlterTable
CREATE SEQUENCE issue_projectid_seq;
ALTER TABLE "Issue" ALTER COLUMN "projectId" SET DEFAULT nextval('issue_projectid_seq');
ALTER SEQUENCE issue_projectid_seq OWNED BY "Issue"."projectId";
