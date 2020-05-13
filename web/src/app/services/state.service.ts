import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Resource} from '../models/resource';
import {Project} from '../models/project';
import {ProjectService} from './project.service';
import {debounceTime, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {ResourceService} from './resource.service';
import {ResourceType} from '../models/resourceType';
import {AuthUser} from '../models/authUser';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {CloudType} from '../models/cloudType';



@Injectable({
  providedIn: 'root'
})
export class StateService {



  constructor(private projectService: ProjectService,
              private resourceService: ResourceService,
              private apiService: ApiService) {
    this.currentUser.next({
      userName: sessionStorage.getItem('currentUser'),
      password: sessionStorage.getItem('currentPassword')
    });
    this.initializeTypes();
  }


  private shownResources = new BehaviorSubject<Resource[]>(undefined);
  private shownProjects = new BehaviorSubject<Project[]>(undefined);
  private selectedProject = new BehaviorSubject<Project>(undefined);
  private filterResourcesByProject = new BehaviorSubject<Project>(undefined);
  private currentUser = new BehaviorSubject<AuthUser>(null);
  private newResources = new Array<Resource>();
  private shownNewResources = new BehaviorSubject<Resource[]>(null);
  private resourceTypes: ResourceType[];
  private cloudTypes: CloudType[];

  private initializeTypes(): void {
    this.resourceTypes = [];
    this.resourceTypes.push(new ResourceType(0));
    this.resourceTypes.push(new ResourceType(5));
    this.resourceTypes.push(new ResourceType(2));
    this.resourceTypes.push(new ResourceType(3));
    this.resourceTypes.push(new ResourceType(4));
    this.resourceTypes.push(new ResourceType(6));
    this.cloudTypes = [];
    this.cloudTypes.push(new CloudType(0));
    this.cloudTypes.push(new CloudType(1));
    this.cloudTypes.push(new CloudType(2));
  }
  getResources(): BehaviorSubject<Resource[]> {
    if (this.filterResourcesByProject.getValue()) {
      this.projectService.getProject(
        this.filterResourcesByProject.getValue())
      .subscribe(_ => {
        // @ts-ignore comes in as a string
        _.resources.map( resource => resource.location = new ResourceType(resource.location));
        this.shownResources.next(_.resources);
      });
    } else {
      this.shownResources.next([]);
    }

    return this.shownResources;
  }

  getProjects(): BehaviorSubject<Project[]> {
    this.projectService.getProjects().subscribe(_ => this.shownProjects.next(_));
    return this.shownProjects;
  }

  searchProjects(terms: Observable<string>): Observable<Project[]> {
    return terms.pipe(debounceTime(400), distinctUntilChanged(),
      flatMap(term => this.projectService.searchProjects(term)));
  }

  setFilterByProject(selectedProject: Project | undefined): Observable<Resource[]> {
    if (selectedProject !== this.filterResourcesByProject.getValue()) {
      this.filterResourcesByProject.next(selectedProject);
    }
    return this.getResources();
  }

  getSelectedProject(): BehaviorSubject<Project> {
    return this.selectedProject;
  }

  setSelectedProject(project: Project): void {
    this.selectedProject.next(project);
  }

  createResource(resource: Resource, project?: Project, ): Observable<Resource> {
    if (project) {
    return this.resourceService.createResource(resource, project);
    }
    return this.resourceService.createResource(resource, this.getSelectedProject().getValue());
  }

  addNewResource(resource: Resource): void {
    this.newResources.push(resource);
    this.shownNewResources.next(this.newResources);
  }

  getNewShownResources(): BehaviorSubject<Resource[]> {
    return this.shownNewResources;
  }


  resetNewResources(): void {
    this.newResources.length = 0;
    this.shownNewResources.next(this.newResources);
    this.getResources();
  }

  deleteResource(resource: Resource): void {
    if (!resource.id) {
      this.newResources = this.newResources.filter(_ => _ !== resource);
      this.shownNewResources.next(this.newResources);
    } else {
      this.resourceService.deleteResource(resource.id).subscribe(_ => this.getResources());

    }
  }

  getResourceTypes(): BehaviorSubject<ResourceType[]> {
    const resourceTypes: BehaviorSubject<ResourceType[]> = new BehaviorSubject<ResourceType[]>(this.resourceTypes);
    return (resourceTypes);
  }

  getCloudTypes(): BehaviorSubject<CloudType[]> {
    const cloudTypes: BehaviorSubject<CloudType[]> = new BehaviorSubject<CloudType[]>(this.cloudTypes);
    return (cloudTypes);
  }

  updateResource(resource: Resource): Observable<Resource> {
    return this.resourceService.updateResource(resource);
  }

  getLoggedInUser(): BehaviorSubject<AuthUser|null> {
    return this.currentUser;
  }

  loginUser(user: string, password: string): Observable<any> {
    console.log('loginUser: ' + user);
    this.currentUser.next(null);
    sessionStorage.clear();
    return this.apiService.get('/user', {userName: user, password}).pipe(map(response => {
        if (response.name) {
          this.currentUser.next({userName: user, password});
          sessionStorage.setItem('currentUser', user);
          sessionStorage.setItem('currentPassword', password);
        }
    }));
  }
  logoutUser(): Observable<any> {
    console.log('logoutUser');
    this.currentUser.next(null);
    sessionStorage.clear();
    return(of(true));
  }
}
