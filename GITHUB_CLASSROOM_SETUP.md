# GitHub Classroom Setup Guide

This guide walks you through setting up GitHub Classroom for the Task Timer PWA coding test.

---

## Table of Contents

1. [Create GitHub Classroom](#step-1-create-github-classroom)
2. [Upload Template Repository](#step-2-upload-template-repository)
3. [Create Assignment](#step-3-create-assignment)
4. [Test with Dummy Account](#step-4-test-with-dummy-account)
5. [Bulk Send Invitations](#step-5-bulk-send-invitations)
6. [Monitor Submissions](#step-6-monitor-submissions)
7. [Review Results](#step-7-review-results)

---

## Step 1: Create GitHub Classroom

### 1.1 Go to GitHub Classroom

Visit: https://classroom.github.com

### 1.2 Sign In

Use your GitHub account (dan-donahue or your main account)

### 1.3 Create a New Classroom

1. Click "New classroom"
2. Select your organization (or create one):
   - **Organization name**: "DanDonahue-Hiring" (or similar)
   - **Organization type**: Free (for personal use)
3. Click "Create classroom"

### 1.4 Name Your Classroom

- **Classroom name**: "Part-Time Junior Developer Candidates"
- **Classroom URL**: `junior-dev-2024` (or current year)

### 1.5 Add Administrators (Optional)

If you have a co-founder or assistant, add them here. Otherwise, skip.

---

## Step 2: Upload Template Repository

### 2.1 Create a New Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: `task-timer-pwa-template`
3. **Description**: "Coding test template for junior developer hiring"
4. **Visibility**: Public (so GitHub Classroom can access it)
5. **Initialize**: Do NOT check any boxes (we'll push the local files)
6. Click "Create repository"

### 2.2 Push Template Code to GitHub

In your terminal, navigate to the template directory:

```bash
cd /Users/dando/Development/GitHub_Classroom_JD_Hire

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Task Timer PWA coding test template"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/task-timer-pwa-template.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2.3 Verify Upload

Go to your repository on GitHub and verify all files are there:
- ✅ README.md
- ✅ MANUAL.md
- ✅ CANDIDATE_ANSWERS.md
- ✅ package.json
- ✅ src/ folder with components
- ✅ .github/workflows/ with auto-grade.yml

---

## Step 3: Create Assignment

### 3.1 Go to Your Classroom

In GitHub Classroom, click on your classroom name

### 3.2 Create New Assignment

Click "New assignment"

### 3.3 Configure Assignment

**Basic Settings:**
- **Assignment title**: "Task Timer PWA - Focus Timer Feature"
- **Assignment type**: Individual
- **Deadline**: 7 days from now (set the exact date/time)
- **Cutoff date**: Same as deadline (no late submissions)

**Repository Settings:**
- **Template repository**: Select `task-timer-pwa-template`
- **Visibility**: Private (each student gets their own private repo)
- **Grant students admin access**: ✅ Yes (they need to manage their repo)

**Starter Code:**
- **Import starter code**: Yes (from template)

**Auto-Grading:**
- **Enable feedback pull requests**: No (we're using GitHub Actions)
- **Enable grading**: Yes
- Click "Add test" and configure:
  - **Test name**: "Auto Grade Submission"
  - **Setup command**: `npm install`
  - **Run command**: `npm test`
  - **Points**: 100 (this is just a placeholder - actual grading is in workflow)

**Advanced Settings:**
- **Enable online IDE**: No (they should use VS Code locally)
- **Allow students to see each other**: No (keep repos private)

### 3.4 Save Assignment

Click "Create assignment"

---

## Step 4: Test with Dummy Account

### 4.1 Get Assignment Link

GitHub Classroom will show you an invitation link:
```
https://classroom.github.com/a/XXXXXX
```

Copy this link.

### 4.2 Create Test Email

Use a throwaway email (Gmail, temp mail, etc.) or your own test account.

### 4.3 Accept Assignment as Test Student

1. Open assignment link in incognito/private window
2. Sign in with test GitHub account (or create one)
3. Accept the assignment
4. Wait for repository to be created
5. Clone the repo and verify:
   - All files present
   - Can install dependencies (`npm install`)
   - Can run dev server (`npm run dev`)
   - Can push changes
   - GitHub Actions run on push

### 4.4 Verify Auto-Grading

1. Make a small change (edit README)
2. Commit and push
3. Check "Actions" tab in the repo
4. Verify auto-grading workflow runs
5. Check that a comment is posted with score

### 4.5 Clean Up Test

Once verified, you can delete the test repository or keep it for reference.

---

## Step 5: Bulk Send Invitations

### 5.1 Prepare Candidate List

Create a CSV file: `candidates.csv`

```csv
name,email
John Doe,john.doe@example.com
Jane Smith,jane.smith@example.com
Carlos Rodriguez,carlos.r@example.com
```

### 5.2 Generate Unique Links

**Option A: Manual (Small Batch)**

1. In GitHub Classroom, go to your assignment
2. Click "Invite students"
3. Copy the invitation link
4. This is a UNIVERSAL link - all students use the same link
5. Paste into Email Template #1 below

**Option B: Automated (Large Batch)**

GitHub Classroom has an API, but for simplicity, use Option A.

### 5.3 Send Email 1: Initial Invitation

Use the email template in `EMAIL_TEMPLATES.md` (created below)

---

## Step 6: Monitor Submissions

### 6.1 View Student Repositories

In GitHub Classroom:
1. Click on your assignment
2. See list of all students who accepted
3. See their commit activity in real-time

### 6.2 Check Auto-Grading Results

For each student:
1. Click their repository name
2. Click "Actions" tab
3. View latest workflow run
4. See their current score

### 6.3 Track Progress

GitHub Classroom shows:
- ✅ Assignment accepted
- ✅ First commit made
- ✅ Tests passing/failing
- ✅ Current score

---

## Step 7: Review Results

### 7.1 After Deadline Passes

1. All repositories auto-close (via `close-expired.yml` workflow)
2. Final scores are calculated
3. A summary issue is created in each repo

### 7.2 Export Scores

GitHub Classroom doesn't have a built-in export, so:

**Manual Method:**
1. Go through each repo
2. Note the final score (in Actions tab or commit comments)
3. Create a spreadsheet:
   ```
   Name | GitHub Username | Score | Repository Link
   ```

**Automated Method:**
Use GitHub API to fetch scores (requires API token):

```bash
#!/bin/bash
# List all repos in classroom and get latest commit comment

for repo in $(gh repo list YOUR_ORG --limit 100 --json name -q '.[].name'); do
  echo "Checking $repo..."
  gh api repos/YOUR_ORG/$repo/comments --jq '.[] | select(.body | contains("Score:")) | .body' | head -1
done
```

### 7.3 Sort by Score

1. Order candidates by final score (highest first)
2. Mark cutoff line (e.g., top 10 or top 20%)

### 7.4 Manual Review of Top Scorers

For the top 10 candidates:

1. **Clone their repository:**
   ```bash
   gh repo clone YOUR_ORG/task-timer-pwa-STUDENT_NAME
   cd task-timer-pwa-STUDENT_NAME
   npm install
   npm run dev
   ```

2. **Test the app manually:**
   - Does timer render?
   - Does countdown work?
   - Does audio play?
   - Is the button named appropriately (trap check)?

3. **Read CANDIDATE_ANSWERS.md:**
   - Are answers thoughtful or rushed?
   - Do they communicate clearly?
   - Red flags or impressive insights?

4. **Review code quality:**
   - Is TypeScript used properly?
   - Are tests well-written?
   - Is code clean and readable?

### 7.5 Make Final Decisions

Create a shortlist:
- **Tier 1** (90-110 points + good answers): Definitely interview
- **Tier 2** (70-89 points + decent answers): Consider if Tier 1 small
- **Tier 3** (50-69 points): Maybe if desperate

### 7.6 Send Invitations

Use Email Template #3 in `EMAIL_TEMPLATES.md`

---

## Troubleshooting

### Problem: Students can't accept assignment

**Solution:** Make sure:
- Assignment link is correct
- Assignment isn't past deadline
- Student has a GitHub account
- Repository template is public

### Problem: Auto-grading not running

**Solution:** Check:
- `.github/workflows/auto-grade.yml` exists in template
- Workflow has correct permissions
- No syntax errors in YAML
- GitHub Actions enabled for organization

### Problem: Students getting errors on `npm install`

**Solution:**
- Verify `package.json` has correct dependencies
- Check Node.js version requirement
- Ensure template repository has all files

### Problem: Deadline auto-close not working

**Solution:**
- Verify `close-expired.yml` workflow is correct
- Check that workflow runs daily (cron schedule)
- GitHub Actions must be enabled

---

## Best Practices

### For You (Dan)

1. **Test everything first** - Use dummy account to verify
2. **Set reminders** - Day 5 reminder, Day 8 review
3. **Respond quickly** - If students email questions
4. **Be fair** - Review top scorers' code manually, don't rely only on auto-grade
5. **Give feedback** - Even rejected candidates appreciate it

### For Students

1. **Read the manual** - Most common issue is not reading instructions
2. **Commit often** - Small commits better than one giant commit
3. **Test locally** - Don't rely only on auto-grader
4. **Ask questions** - But only after trying to solve it themselves
5. **Submit early** - Don't wait until last minute

---

## Timeline Summary

**Day 0 (Setup Day):**
- Create classroom
- Upload template
- Create assignment
- Test with dummy account
- Send invitation emails

**Day 1-7 (Student Work Period):**
- Students work on test
- Auto-grader runs on every push
- You monitor progress (optional)

**Day 5:**
- Auto-reminder email sent
- Check that most students are active

**Day 8 (Deadline):**
- Repositories auto-close
- Final scores calculated
- You review top scorers

**Day 9-14 (Interview Selection):**
- Manual review of submissions
- Read personal answers
- Test top candidates' apps
- Send interview invitations

---

## Cost

**GitHub Classroom:**
- Free for public repos
- Free for educational use

**Your Time:**
- Setup: 1-2 hours
- Monitoring: 10 minutes/day (optional)
- Review: 30-45 minutes total

**Student Time:**
- Test duration: 5-10 hours over 7 days

---

## Support

If you have issues with GitHub Classroom:
- Docs: https://docs.github.com/en/education/manage-coursework-with-github-classroom
- Community: https://github.com/orgs/community/discussions
- Support: https://support.github.com

---

**You're all set!** Follow these steps and you'll have a professional, scalable hiring pipeline.
