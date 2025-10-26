---
title: Separate methods that do not communicate
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-26
---
`Separate methods that do not communicate` is one of rules for finding frameworks.

This rule says
- If half of its methods access half of its instance variables and vice versa, it almost should be split

This happens when there are different ways to view objects in the class and it implies that there are more than 2 roles OR responsibilities that barely communicates each other.
- In other words, class is not coherent enough and 2 independent abstractions exist in one class.

So it's better to split into separate components.

Example

Without this rule, class becomes complicated, handling multiple point of views. We'll take a look at the example of `complex graphical object` with following roles
1. Image Caching / Display (Bitmap View)
	 - Cache image as bitmap and display if valid. Otherwise, it re-calculates image. This role accesses to the instance variables (DATA)
2. Collection View
	-  Considered to be a collection of objects that can be added / removed. This role accesses to the instance variables (DATA)

```java
class ComplexGraphic {
	// Instance variables that are related to image caching (accessed by group A)
	private boolean isCacheValid = false;
	private byte[] bitmapCache;
	
	// Instance variables that are related to component management (accessed by group B)
	private List<GraphicObject> components = new ArrayList<>();
	
	// A Group Methods: Cache / Bitmap logic
	public void display() {
		if (isCacheValid) {
			System.out.println("A: Display a cached image")
		} else {
			recalculateImage();
			System.out.println("A: Recalculate an image and display);
		}
	}
	
	private void recalculateImage() {
		bitmapCache = new byte[]{1, 2, 3};
		isCacheValid = true;
	}
	
	// B Group Methods: Colletion management logic
	public void addComponent(GraphicObject obj) {
		components.add(obj);
		invalidateCache(); // affects instance variables of group A
		System.out.println("B: Added component, invalidating cache");
	}
	
	public void removeComponent() {
		components.remove(obj);
		invalidateCache(); // affects instance variables of group A
		System.out.println("B: Added component, invalidating cache");
	}
}
```
- Cohesion issue (Graphic Representation and Component management is bound in the same class)
- Limitation of Inheritance: We could make this class as subclass of 1-Bitmap Image OR 2-Collection. However, Java doesn't support both at the same time.

After applying this rule
```java
interface Renderable {
	void display();
	void invalidate();
}

interface ComponentManager {
	void addComponent(GraphicObject obj);
	void removeComponent(GraphicObject obj);
}

class BitmapCacheRenderer implements Renderable {
	private boolean isCacheValid = false;
	private byte[] bitmapCache;
	
	@Override
	public void display() {
		if (!isCacheValid) {
			recalculateImage();
		}
		System.out.println("Renderer: Display a cached image");
	}
	
	private void recalculateImage() {
		this.bitmapCache = new byte[]{4, 5, 6};
		this.isCacheValid = true;
	}
	
	@Override
	public void invalidate() {
		this.isCacheValid = false;
	}
}

class SimpleComponentCollection implements ComponentManager {
    private List<GraphicObject> components = new ArrayList<>();
    private Renderable linkedRenderer; // References to separated compoennt분리된 다른 컴포넌트에 대한 참조

    public SimpleComponentCollection(Renderable linkedRenderer) {
        this.linkedRenderer = linkedRenderer;
    }

    @Override
    public void addComponent(GraphicObject obj) {
        components.add(obj);
        linkedRenderer.invalidate(); // Send a message to other components
        System.out.println("Collection: Added component. Request to invalidate cache to a renderer.");
    }

    @Override
    public void removeComponent(GraphicObject obj) {
        components.remove(obj);
        linkedRenderer.invalidate();
    }
}
```

As a result we could have an object (like a coordinator)
```java
class ComplexGraphic {
	private Renderable renderer;
	private ComponentManager structure;
	
	public ComplexGraphic() {
		this.renderer = new BitmapCacheRenderer();
		this.structure = new SimpleComponentCollection(this.renderer);
	}
	
	public void draw() {
		renderer.display();
	}
	
	public void modify(GraphicObject obj) {
		structure.addComponent(obj);
	}
}
```

This rule has benefits such as
- Flexibility and Portability: If we separate a bitmap class, it's easy to port to a different system with different graphic primitives.
- Composition: It helps to keep class hierarchy simple.
- Cohesion: Each component focuses on its own role.

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.3 Rules for Finding Frameworks]]
