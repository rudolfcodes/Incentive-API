# Incentive API Design

## What the App should do

1. Create a plan
2. Give a grant to a user under a plan
3. List plans and grants
4. Enforce basic rules

- Only logged in users can create things
- Users belong to a tenant/company; they only see their own tenant's data
- Inputs are validated

5. GraphQL is used to expose the data

### Entities

1. Company / Tenant

- Why: Multi-tenant isolation so Company A can't see Company B
- Columns: id, name

2. User

- Why: who logs in and owns grants
- Columns: id, email, name, role(admin/employee), companyId

3. Plan

- Why: rulebook under which you grant equity
- Columns: id, name, description, companyId, defaultVestingMonths

4. Grant

- Why: actual award to a user
- Columns: id, userId, planId, quantity, grantDate, vestingMonths, fairValuePerUnit

5. AuditLog - For future

- Why: who did what, when
- Columns: id, actorUserId, companyId, action(e.g. CREATE GRANT), entity(e.g. GRANT), entityId, before, after, timestamp

### GraphQL

- Queries
  - me - returns: { id, email, role, company { id, name } } - returns User
  - company - returns: Company
  - plans - list plans for company: [{ id, name, description }] - returns Plan
  - grants() - returns: [{ id, quantity, grantDate, vestingMonths, user { id, email }, plan { id, name } }] - returns Grant
  - expenseSchedule(grantId) - returns simple monthly schedule: { grantId, period: "monthly", rows: [{ periodStart, expense, cumulative }] } - returns ExpenseSchedule

- Mutations
  - signIn(email, password)
  - signUpCompany(input: { companyName, adminEmail, password, name }) - returns: AuthPayload
  - signOut - clears cookie
  - createPlan(input) - Input: { name, description? } - Output: { id, name }
  - createGrant(input) - Input: { userId, planId, quantity, grantDate, vestingMonths, fairValuePerUnit } - Output: { id }
  - updatePlan(id, input)
  - deletePlan(id)

- Future mutations
  - updateGrant(id, input)
  - deleteGrant(id)

### Modules

- AppModule
- AuthModule
  - Guard to block mutations without login. checks role === 'admin'
  - roles live here
- CompaniesModule
  - Mostly used to verify companyId references.
- UsersModule
- PlansModule
  - CRUD plans
  - Validation on inputs
- GrantsModule
  - CRUD grants
  - Validates userId and planId belong to the same tenant.
- ReportsModule
  - expenseSchedule(grantId) logic (even split per month).

### Services

- AuthService
- CompaniesService
- UsersService
  - list
  - findById
- PlansService
  - list
  - create
  - update
  - delete
- GrantsService
  - list
  - create
  - update
  - delete
- ReportsService
  - expenseSchedule
  - fetchGrant
  - total
  - vestingMonths
- AuditLogService
  - record
