import math
import xml.etree.ElementTree as ET
import pprint
import sys
import json

pp = pprint.PrettyPrinter(indent=4)


def circle_to_point(circle):
    return (circle['cx'],
            circle['cy'])

def get_all_points(tree):
    return [circle_to_point(circle)
            for circle in tree
            if "group" in circle]

def get_point_by_id(tree, point_id):
    return [circle_to_point(point)
            for point in tree
            if 'id' in point
            if point['id'] == point_id]

def distance_squared(point1, point2):
    x1, y1 = point1
    x2, y2 = point2

    dx = x1 - x2
    dy = y1 - y2

    return dx * dx + dy * dy


def closest_point(all_points, new_point):
    best_point = None
    best_distance = None

    for current_point in all_points:
        current_distance = distance_squared(new_point, current_point)

        if best_distance is None or current_distance < best_distance:
            best_distance = current_distance
            best_point = current_point

    return best_point


k = 2


def build_kdtree(points, depth=0):
    n = len(points)

    if n <= 0:
        return None

    axis = depth % k

    sorted_points = sorted(points, key=lambda point: point[axis])

    return {
        'point': sorted_points[n // 2],
        'left': build_kdtree(sorted_points[:n // 2], depth + 1),
        'right': build_kdtree(sorted_points[n // 2 + 1:], depth + 1)
    }


def kdtree_naive_closest_point(root, point, depth=0, best=None):
    if root is None:
        return best

    axis = depth % k

    next_best = None
    next_branch = None

    if best is None or distance_squared(point, best) > distance_squared(point, root['point']):
        next_best = root['point']
    else:
        next_best = best

    if point[axis] < root['point'][axis]:
        next_branch = root['left']
    else:
        next_branch = root['right']

    return kdtree_naive_closest_point(next_branch, point, depth + 1, next_best)


def closer_distance(pivot, p1, p2):
    if p1 is None:
        return p2

    if p2 is None:
        return p1

    d1 = distance_squared(pivot, p1)
    d2 = distance_squared(pivot, p2)

    if d1 < d2:
        return p1
    else:
        return p2


def kdtree_closest_point(root, point, depth=0):
    if root is None:
        return None

    axis = depth % k

    next_branch = None
    opposite_branch = None

    if point[axis] < root['point'][axis]:
        next_branch = root['left']
        opposite_branch = root['right']
    else:
        next_branch = root['right']
        opposite_branch = root['left']

    best = closer_distance(point,
                           kdtree_closest_point(next_branch,
                                                point,
                                                depth + 1),
                           root['point'])

    if distance_squared(point, best) > (point[axis] - root['point'][axis]) ** 2:
        best = closer_distance(point,
                               kdtree_closest_point(opposite_branch,
                                                    point,
                                                    depth + 1),
                               best)

    return best

files = ['./data.json', './data2.json', './data3.json']
for jsonF in files:
    print(jsonF)
    
    f = open(jsonF)
    data = json.load(f)
    
    for i in data:
        print(i)

    f.close()
    
    [pivot] = get_point_by_id(data, 'pivot')
    [expected] = get_point_by_id(data, 'closest')
    points = get_all_points(data)
    kdtree = build_kdtree(points)

    found = kdtree_closest_point(kdtree, pivot)

    expected_distance = math.sqrt(distance_squared(pivot, expected))
    found_distance = math.sqrt(distance_squared(pivot, found))

    print("  Expected: %s (distance: %f)" % (expected, expected_distance))
    print("  Found:    %s (distance: %f)" % (found, found_distance))

    if found_distance > expected_distance:
        print("  ----- FAILURE! FOUND WORSE DISTANCE! -----")
        sys.exit(1)
