<h1>Pseudo Element</h1>

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element!

## ::selection
```css
::selection {
	background-color: cyan;
}
```
Applies styles to the part of a document that has been highlighted by the user(such as clicking and dragging the mouse across text).

## ::placeholder
```css
::placeholder {
	color: cyan;
	font-size: 1.3em;
}
```
Represents the placeholder text in an <input> or <textarea> element.

## ::backdrop
```css
dialog::backdrop {
	background : rgb(255, 0, 0);
}
```
It's a box the size of the viewport which is rendered immediately beneath any element being presented in full-screen mode.

## ::cue
```css
::cue {
	color : rgb(255, 0, 0);
	font-weight: bold;
}
```
Matches WebVTT cues within a selected element. This can be used to style captions and other cues in media with VTT tracks.

## ::slotted()
```css
::slotted(*) {
	font-weight: bold;
}
```
Represents any element that has been placed into a slot insied an HTML template.

