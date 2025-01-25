

```md
### How to Contribute

1. **Fork the Repository**  
   Go to the [repository's GitHub page](https://github.com/SuyashShukla0007/Nomads-Turf) and click on the **Fork** button to create a copy of the repository in your account.

2. **Clone Your Fork**  
   After forking the repository, clone it to your local machine:
   ```bash
   git clone https://github.com/your-username/Nomads-Turf.git
   ```

3. **Create a New Branch**  
   Before making any changes, create a new branch:
   ```bash
   git checkout -b your-feature-branch
   ```

4. **Make Your Changes**  
   Modify the code as needed.

5. **Commit Your Changes**  
   Use conventional commit messages to describe your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push Your Changes**  
   Push your changes back to your fork:
   ```bash
   git push origin your-feature-branch
   ```

7. **Create a Pull Request**  
   Go to your forked repository on GitHub and click on the **Pull Request** button. Choose the base repository and branch where you want your changes to be merged, then submit the pull request.
```

This guide provides all necessary steps for contributing using the fork-and-pull request method.

## Commit Message Guidelines

This project follows **Conventional Commits** to ensure consistency and clarity in commit messages. Please follow the format below:

### 🎯 Commit Message Format

```
<type>(<scope>): <description>
```

- **`type`**: Describes the kind of change. The available types are:
  - **`feat`**: New feature.
  - **`fix`**: Bug fix.
  - **`docs`**: Documentation only changes.
  - **`style`**: Code style changes (e.g., formatting, missing semicolons).
  - **`refactor`**: Refactoring code (neither fixes a bug nor adds a feature).
  - **`perf`**: Performance improvements.
  - **`test`**: Adding or updating tests.
  - **`chore`**: Miscellaneous tasks (e.g., updating build scripts).
  - **`revert`**: Reverts a previous commit.

- **`scope`** (optional): A brief identifier specifying the part of the codebase affected (e.g., `auth`, `cart`, `readme`).

- **`description`**: A concise description of the change.

---

### 🛠️ Examples

- `feat(auth): add login functionality`
- `fix(cart): resolve item count issue`
- `docs(readme): update contributing guide`




---
