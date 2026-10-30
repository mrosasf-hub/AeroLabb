import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'

export default function PythonEditor({ code, onChange, onCursorLineChange, minHeight = '300px' }) {
  return (
    <div className="editor-shell">
      <div className="editor-titlebar">
        <span><i></i><i></i><i></i></span>
        <b>Python 3 · Aerolab</b>
      </div>
      <CodeMirror
        value={code}
        height={minHeight}
        theme="dark"
        extensions={[python()]}
        onChange={onChange}
        onUpdate={(viewUpdate) => {
          if (!onCursorLineChange) return
          const head = viewUpdate.state.selection.main.head
          onCursorLineChange(viewUpdate.state.doc.lineAt(head).number)
        }}
        basicSetup={{ lineNumbers: true, highlightActiveLine: true, foldGutter: true, bracketMatching: true, autocompletion: true }}
      />
    </div>
  )
}
