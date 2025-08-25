# Why I Switched from VSCode to Neovim

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="/meme1.jpeg" alt="Project 1 Preview" width="300px" height="200px" />
      </td>
      <td width="50%">
        <img src="/meme2.jpeg" alt="Project 1 Preview" width="300px" height="200px" />
      </td>
    </tr>
    
  </table>
</div>

## The Journey from GUI to Terminal

After years of using VSCode, I finally made the switch to Neovim (nvim) and haven't looked back. Neovim has a ton of benefits that i'm going to talk about, but one of the most important is the longer battery life and performance boost. Now, i have quite a decent laptop, but i started to experience bottlenecks when i tried to run Vscode along with docker or a minikube cluster.

My battery life of about 8 hrs would reduce to 4-5 hrs at most and that's when i realized i need a change.
Setting up nvim and learning vim motions hasn't been walk in the park, it has a steep learning curve but once you do it you are hooked. it kinda feels like escaping the matrix. Using neovim elevates you to a higher point of consciousness where you can look down upon the poor lost souls using tools like vscode and intelliJ and emacs😂.

## Key Benefits of Neovim

### ⚡ Performance and Speed

- **Lightning fast startup**: Neovim starts in milliseconds, not seconds
- **Minimal resource usage**: Uses significantly less RAM and CPU compared to Electron-based editors
- **Efficient text manipulation**: Modal editing makes complex text operations incredibly fast

### 🎯 Modal Editing Mastery

- **Vim motions**: Navigate and edit text without touching the mouse
- **Composable commands**: Combine motions, operators, and text objects for powerful editing
- **Muscle memory**: Once learned, Vim keybindings become second nature and work everywhere

### 🔧 Ultimate Customization

- **Lua configuration**: Modern, fast scripting language for configuration
- **Plugin ecosystem**: Thousands of plugins available through package managers like lazy.nvim
- **Complete control**: Every aspect of the editor can be customized to your exact needs

### 🌐 Universal Availability

- **SSH-friendly**: Edit files on remote servers seamlessly
- **Terminal native**: Works perfectly in any terminal environment
- **Platform agnostic**: Same experience across Linux, macOS, and Windows

### 🚀 Developer Productivity Features

- **Built-in LSP client**: Native Language Server Protocol support
- **Treesitter integration**: Advanced syntax highlighting and code analysis
- **Telescope.nvim**: Fuzzy finding for files, buffers, and more
- **Git integration**: Excellent Git workflow with plugins like fugitive and gitsigns

## Why I Made the Switch

### The VSCode Pain Points

- Heavy resource consumption (especially with multiple extensions)
- Slower startup times
- Limited customization compared to Neovim's flexibility
- Mouse dependency breaking coding flow

### The Neovim Advantages

- **Speed**: Everything is faster - startup, file operations, searching
- **Focus**: Terminal-based workflow keeps me in the zone
- **Efficiency**: Vim motions make editing incredibly efficient
- **Learning**: Forced me to become a better developer by understanding my tools deeply

## The Learning Curve

Yes, there's a learning curve, but it's worth it:

1. **Week 1-2**: Frustrating but educational - learning basic motions
2. **Month 1**: Becoming productive, discovering the power of modal editing
3. **Month 3+**: Muscle memory kicks in, editing becomes effortless

## Essential Plugins That Made the Transition Smooth

- **lazy.nvim**: Plugin manager
- **nvim-lspconfig**: LSP configuration
- **telescope.nvim**: Fuzzy finder
- **nvim-treesitter**: Syntax highlighting
- **which-key.nvim**: Keybinding helper
- **neo-tree.nvim**: File explorer
- **lualine.nvim**: Status line

## Configuration Philosophy

My Neovim config follows these principles:

- Minimal but powerful
- Fast startup time
- Consistent keybindings
- IDE-like features without the bloat

---

## The Obligatory Vim Meme

```
    How to exit Vim:

    Step 1: Try to exit Vim
    Step 2: Google "how to exit vim"
    Step 3: :q!
    Step 4: Realize you've joined the cult
    Step 5: Why would i ever want to exit vim

    ┌─────────────────────────────────┐
    │ Before Vim:  😄 Happy Developer  │
    │ Learning Vim: 😫 Confused        │
    │ After Vim:   😎 Vim Master       │
    │ Without Vim: 😭 Lost Soul ☠️     │
    └─────────────────────────────────┘

    "I don't always edit text,
     but when I do, I prefer Vim motions
     in every single application I use."
```

---

## Conclusion

Switching from VSCode to Neovim was challenging but ultimately rewarding. The speed, efficiency, and deep customization options make it worth the initial investment in learning. Once you experience the power of modal editing and the satisfaction of a perfectly tuned editor, there's no going back.

**Pro tip**: You don't have to go cold turkey. Try Vim motions in VSCode first with the Vim extension, then gradually transition to Neovim when you're comfortable.

---

> if you don't use Neovim eventually you'll yourself alone in a urinal, i walk in, turn my head and look at you then say this three words **"i use neovim, BTW"**, you'll immediatly feel smaller, like your editor is not just well endowed as you thought

> -Peteron kinyanjui
