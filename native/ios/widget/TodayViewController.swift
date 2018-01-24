//
//  TodayViewController.swift
//  widget
//
//  Created by Valery Madiedo on 1/23/18.
//

import UIKit
import NotificationCenter

class TodayViewController: UIViewController, NCWidgetProviding {
    let defaults = UserDefaults(suiteName: "group.testing.widget.v1") //name of the group in "App Groups"
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
        // Perform any setup necessary in order to update the view.
        
        // If an error is encountered, use NCUpdateResult.Failed
        // If there's no update required, use NCUpdateResult.NoData
        // If there's an update, use NCUpdateResult.NewData
        
        completionHandler(NCUpdateResult.newData)
    }
    
    @IBAction func openApp(_ sender: Any) {
        let url: NSURL? = NSURL(string: "main-view-controller:")!
        
        if let appurl = url {
            defaults?.set(true, forKey: "widgetClicked")
            defaults?.synchronize()
            self.extensionContext!.open(appurl as URL, completionHandler: nil)
            
        }
    }
    
}
