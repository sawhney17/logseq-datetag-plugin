import '@logseq/libs';
import { getDateForPage } from 'logseq-dateutils';


function getCreationDate(e, dateFormat) {
  let initialblock = logseq.Editor.getBlock(e.uuid).then(refBlock => {
    console.log(refBlock)
    if (refBlock["createdAt"]) {
    let date = refBlock["createdAt"]
    let dateObj = new Date(date);
    console.log(dateObj)
    let dateString = getDateForPage(dateObj, dateFormat);
    console.log(dateString)
    let tag = `#${dateString}`;
    
    logseq.Editor.updateBlock(refBlock.uuid, `${refBlock.content} ${tag}`);
    } else {
    logseq.App.showMsg("No creation data could be found")
    }
    //unix timestamp to date
  })
  
}
const main = async () => {
  console.log('date tag plugin loaded');

  // Insert renderer upon slash command
  logseq.Editor.registerSlashCommand('insert creation date as tag', async (e) => {
    const userConfigs = await logseq.App.getUserConfigs();
    const preferredDateFormat = userConfigs.preferredDateFormat;
    
    getCreationDate(e, preferredDateFormat);
  }
  )
  logseq.Editor.registerBlockContextMenuItem(
    'insert Creation Date as Tag',
    async (e) => {
      const userConfigs = await logseq.App.getUserConfigs();
      const preferredDateFormat = userConfigs.preferredDateFormat;
    
      getCreationDate(e, preferredDateFormat);
    }
  );
}


logseq.ready(main).catch(console.error);
