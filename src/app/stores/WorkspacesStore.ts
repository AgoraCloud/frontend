import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';
import { Workspaces, Workspace } from 'app/models';
import { CreateWorkspaceFormModel } from 'app/forms';

export class WorkspacesStore {


   @observable workspaces: Workspaces
   @observable _selectedWorkspace: Workspace
   @observable createWorkspaceForm: CreateWorkspaceFormModel
   @observable state: 'loading' | 'loaded' | 'unloaded'
   constructor(private rootStore: RootStore) {
      this.workspaces = new Workspaces()
      this.state = 'unloaded'
      this.createWorkspaceForm = new CreateWorkspaceFormModel()
      // this.load()
   }

   load = async () => {
      this.state = 'loading'
      await this.workspaces.load()
      this._selectedWorkspace = this.workspaces.workspaces[0]
      this.state = 'loaded'
   }

   get selectedWorkspace(){
      // todo update the selected workspace when the route changes
      return this._selectedWorkspace
   }

   set selectedWorkspace(workspace: Workspace){
      this._selectedWorkspace = workspace
      const wid = workspace.id
      const path = this.rootStore.routerStore.location.pathname

      // the following will retain any values in the path after the workspace id
      // this may be problematic if for say the path is 
      // /w/:wID/d/:dID because the updated wID will not have the deployment with dID within it
      // TODO: this will have to be more sophisticated
      const newPath = path.replace(/\/w\/[a-zA-Z0-9]{24}/, `/w/${wid}`)
      this.rootStore.routerStore.replace(newPath)
   }
   
   createWorkspace = async () => {
      const form = this.createWorkspaceForm
      const successful = await form.submit()
      if (successful) {
         this.rootStore.snackbarStore.push({
            message: 'Success: Workspace Created!',
            variant: 'success'
         })
         form.reset()
         this.load()
      } else {
         this.rootStore.snackbarStore.push({
            message: 'Failure: ' + form.message,
            variant: 'error'
         })
      }
      return successful
   }

}