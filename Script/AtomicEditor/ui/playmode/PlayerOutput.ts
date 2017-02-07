//
// Copyright (c) 2014-2016 THUNDERBEAST GAMES LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

import EditorUI = require("../EditorUI");
import Preferences = require("../../editor/Preferences");

class PlayerOutput extends Atomic.UIWindow {

    output: Atomic.UIEditField;
    closeOnStop: Atomic.UICheckBox;

    constructor() {

        super();

        var view = EditorUI.getView();
        view.addChild(this);

        this.text = "Player Output";

        this.load("AtomicEditor/editor/ui/playeroutput.tb.txt");

        this.output = <Atomic.UIEditField> this.getWidget("output");
        this.closeOnStop = <Atomic.UICheckBox> this.getWidget("closeonstop");

        this.closeOnStop.value = Preferences.getInstance().editorFeatures.closePlayerLog ? 1 : 0;

        (<Atomic.UIButton>this.getWidget("closebutton")).onClick = () => {

            this.close();

        };

        this.subscribeToEvent(this, Atomic.UIWidgetEvent((data) => this.handleWidgetEvent(data)));
        this.subscribeToEvent(Editor.EditorPlayerLogEvent((ev: Editor.EditorPlayerLogEvent) => this.handlePlayerLog(ev)));

        this.resizeToFitContent();
        this.center();
        this.setFocus();

    }

    handlePlayerLog(ev: Editor.EditorPlayerLogEvent) {

        var text = this.output.text;

        if (text.length > 32768)
            this.output.text = "";

        this.output.appendText(ev.message + "\n");
        this.output.scrollTo(0, 0xffffff);
    }


    handleWidgetEvent(ev: Atomic.UIWidgetEvent) {

        if (ev.type == Atomic.UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            var id = ev.target.id;
            if (id == "closeonstop") {
                Preferences.getInstance().editorFeatures.closePlayerLog = this.closeOnStop.value > 0 ? true : false;
                Preferences.getInstance().write();
                return true;
            }
        }
    }

}

export = PlayerOutput;
