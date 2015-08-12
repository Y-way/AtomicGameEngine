
export enum StringID {

    RevealInFinder,
    ShortcutUndo,
    ShortcutRedo,
    ShortcutCut,
    ShortcutCopy,
    ShortcutPaste,
    ShortcutSelectAll,
    ShortcutFind,
    ShortcutFindNext,
    ShortcutFindPrev,
    ShortcutBeautify,
    ShortcutCloseFile,
    ShortcutSaveFile,
    ShortcutPlay,
    ShortcutBuild,
    ShortcutBuildSettings
}

export class EditorString {

    public static GetString(id: StringID): string {

        return EditorString.lookup[id];

    }

    private static lookup: { [id: number]: string; } = {};

    private static Ctor = (() => {

        var lookup = EditorString.lookup;

        var lookup = EditorString.lookup;

        var shortcutKey;
        if (Atomic.platform == "MacOSX") {
            shortcutKey = "⌘";
        } else { // Windows and Linux
            shortcutKey = "CTRL + "
        }

        lookup[StringID.RevealInFinder] = "Reveal in Finder";
        
        // Mac, Windows and Linux
        lookup[StringID.ShortcutRedo] = "⇧" + shortcutKey + "Z";
        lookup[StringID.ShortcutFindNext] = shortcutKey + "G";
        lookup[StringID.ShortcutFindPrev] = "⇧" + shortcutKey + "G";
        lookup[StringID.ShortcutBuildSettings] = "⇧" + shortcutKey + "B";

        // General
        lookup[StringID.ShortcutUndo] = shortcutKey + "Z";

        lookup[StringID.ShortcutCut] = shortcutKey + "X";
        lookup[StringID.ShortcutCopy] = shortcutKey + "C";
        lookup[StringID.ShortcutPaste] = shortcutKey + "V";
        lookup[StringID.ShortcutSelectAll] = shortcutKey + "A";
        lookup[StringID.ShortcutFind] = shortcutKey + "F";

        lookup[StringID.ShortcutBeautify] = shortcutKey + "I";

        lookup[StringID.ShortcutSaveFile] = shortcutKey + "S";
        lookup[StringID.ShortcutCloseFile] = shortcutKey + "W";

        lookup[StringID.ShortcutPlay] = shortcutKey + "P";

        lookup[StringID.ShortcutBuild] = shortcutKey + "B";

    })();

}