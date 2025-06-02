import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';
// import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    InlineEditor,
    Alignment,
    Autoformat,
    AutoImage,
    Autosave,
    BalloonToolbar,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    CodeBlock,
    Emoji,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    PlainTableOutput,
    RemoveFormat,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableLayout,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';


const LICENSE_KEY = 'GPL';

export default function CustomEditor() {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const editorInstanceRef = useRef(null); // <-- store editor instance here
    const [latexResults, setLatexResults] = useState<string[]>([]);
    const convertMathMLToLatex = async (mathml: string, isDisplay: boolean): Promise<string> => {
        const response = await fetch('https://johnmacfarlane.net/texmath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                text: mathml,
                from: 'mathml',
                to: 'tex',
                display: isDisplay,
            }),
        });

        const data = await response.json();
        return data.text;
    };
    const handleConvert = async () => {
        if (!editorInstanceRef.current) return;

        const htmlContent = editorInstanceRef.current.getData();
        const container = document.createElement('div');
        container.innerHTML = htmlContent;

        const formulas = container.querySelectorAll('.Wirisformula');
        const results: string[] = [];

        for (const el of Array.from(formulas)) {
            const mathml = el.getAttribute('data-mathml');
            if (!mathml) continue;

            const isDisplay = el.tagName.toLowerCase() === 'div';
            try {
                const latex = await convertMathMLToLatex(mathml, isDisplay);
                results.push(`\\(${latex}\\)`); // or \\[latex\\] if display
            } catch (e) {
                results.push('[Error converting formula]');
            }
        }

        setLatexResults(results);
    };
    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                math: {
                    engine: 'mathjax',       // use MathJax to render LaTeX
                    outputType: 'latex',     // render using LaTeX syntax
                    enablePreview: true      // optional: live preview
                },
                wiris: {
                    saveMode: 'latex'        // save formulas in LaTeX instead of MathML/SVG
                },
                toolbar: {
                    items: [
                        'MathType',
                        'ChemType',
                        'undo',
                        'redo',
                        '|',
                        'findAndReplace',
                        '|',
                        'heading',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'subscript',
                        'superscript',
                        'code',
                        'removeFormat',
                        '|',
                        'emoji',
                        'specialCharacters',
                        'horizontalLine',
                        'link',
                        'bookmark',
                        'insertImage',
                        'mediaEmbed',
                        'insertTable',
                        'insertTableLayout',
                        'highlight',
                        'blockQuote',
                        'codeBlock',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    MathType,
                    Alignment,
                    Autoformat,
                    AutoImage,
                    Autosave,
                    BalloonToolbar,
                    Base64UploadAdapter,
                    BlockQuote,
                    Bold,
                    Bookmark,
                    Code,
                    CodeBlock,
                    Emoji,
                    Essentials,
                    FindAndReplace,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsert,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    PlainTableOutput,
                    RemoveFormat,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Strikethrough,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableLayout,
                    TableProperties,
                    TableToolbar,
                    TextTransformation,
                    TodoList,
                    Underline,
                    WordCount
                ],
                balloonToolbar: ['MathType',
                    'ChemType', 'bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
                fontFamily: {
                    supportAllValues: true
                },
                fontSize: {
                    options: [10, 12, 14, 'default', 18, 20, 22],
                    supportAllValues: true
                },
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                initialData:
                    '',
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: [
                                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                            ]
                        }
                    ]
                },
                placeholder: 'Type or paste your content here!',
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                }
            }
        };
    }, [isLayoutReady]);



    return (
        <div className="main-container">
            <div
                className="editor-container editor-container_inline-editor editor-container_include-word-count"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {editorConfig && (
                            <CKEditor
                                editor={InlineEditor}
                                config={editorConfig}
                                onReady={(editor) => {
                                    editorInstanceRef.current = editor; // save instance here

                                    // attach word count UI
                                    const wordCount = editor.plugins.get('WordCount');
                                    editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                                }}
                                onAfterDestroy={() => {
                                    Array.from(editorWordCountRef.current.children).forEach((child) => child.remove());
                                    editorInstanceRef.current = null; // clear editor instance ref
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="editor_container__word-count" ref={editorWordCountRef}></div>
            </div>

            {/* Button to log HTML content */}
            <button
                onClick={() => {
                    if (editorInstanceRef.current) {
                        const htmlContent = editorInstanceRef.current.getData();
                        console.log('Current editor HTML content:', htmlContent);
                    } else {
                        console.log('Editor not ready');
                    }
                }}
            >
                Log Editor HTML
            </button>
        </div>
    );

}
